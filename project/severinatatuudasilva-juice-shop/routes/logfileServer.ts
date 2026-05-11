/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import path from 'node:path'
import { type Request, type Response, type NextFunction } from 'express'

import * as security from '../lib/insecurity'

export function serveLogFiles () {
  return ({ params }: Request, res: Response, next: NextFunction) => {
    let file = params.file

    if (!file.includes('/')) {
      // Mitigate poison null byte attacks
      file = security.cutOffPoisonNullByte(file)

      // Reject attempts to traverse directories using .. or backslashes
      if (file.includes('..') || file.includes('\\')) {
        res.status(403)
        next(new Error('Invalid file name!'))
        return
      }

      // Allow only log/text files
      if (!endsWithAllowlistedFileType(file)) {
        res.status(403)
        next(new Error('Only .log and .txt files are allowed!'))
        return
      }

      // Sanitize filename to remove any remaining dangerous characters
      file = security.sanitizeFilename(file)

      res.sendFile(path.resolve('logs/', file))
    } else {
      res.status(403)
      next(new Error('File names cannot contain forward slashes!'))
    }
  }
}

function endsWithAllowlistedFileType (param: string) {
  return param.endsWith('.log') || param.endsWith('.txt')
}
