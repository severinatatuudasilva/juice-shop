import re
from pathlib import Path


def test_no_plain_totp_secrets():
    # tests/ -> repo root
    repo_root = Path(__file__).resolve().parent.parent
    users_file = repo_root / "data" / "static" / "users.yml"
    content = users_file.read_text(encoding="utf-8")

    # Detect totpSecret values that look like raw Base32 (A-Z2-7) with optional padding '='
    # Allow optional single/double quotes around the value, case-insensitive, line-scoped.
    pattern = re.compile(r"(?im)^\s*totpSecret:\s*(['\"])?([A-Z2-7=]{16,})\1\s*$")
    matches = [m.group(2) for m in pattern.finditer(content)]

    # There should be no raw Base32-like TOTP secrets in the committed file.
    assert matches == [], f"Found potential raw TOTP secrets in users.yml: {matches}"
