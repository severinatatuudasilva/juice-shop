/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import sinon from 'sinon'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import { serveLogFiles } from '../../routes/logfileServer'
const expect = chai.expect
chai.use(sinonChai)

describe('logfileServer', () => {
  let req: any
  let res: any
  let next: any

  beforeEach(() => {
    res = { sendFile: sinon.spy(), status: sinon.spy() }
    req = { params: {}, query: {} }
    next = sinon.spy()
  })

  it('should serve .log files from folder /logs', () => {
    req.params.file = 'access.log'

    serveLogFiles()(req, res, next)

    expect(res.sendFile).to.have.been.calledWith(sinon.match(/logs[/\\]access\.log/))
  })

  it('should raise error for slashes in filename', () => {
    req.params.file = '../../../../nice.try'

    serveLogFiles()(req, res, next)

    expect(res.sendFile).to.have.not.been.calledWith(sinon.match.any)
    expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error))
  })

  it('should raise error for directory traversal using ..', () => {
    req.params.file = '..'

    serveLogFiles()(req, res, next)

    expect(res.sendFile).to.have.not.been.calledWith(sinon.match.any)
    expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error))
  })

  it('should raise error for disallowed file type', () => {
    req.params.file = 'nice.try'

    serveLogFiles()(req, res, next)

    expect(res.sendFile).to.have.not.been.calledWith(sinon.match.any)
    expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error))
  })
})
