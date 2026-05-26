# CI Status Check Verification v5

Final attempt with GitHub App authentication.
Source 161 rebound: integration 80 (PAT) → 87 (github_app, installation_id 131660677).
Expect: pull_request.synchronize → SAST scan → PostCiStatusJob → CheckRunPoster (App token) → Check Run.
Timestamp: 2026-05-12T20:28Z