import re
import pathlib


def test_no_raw_totp_secret_present():
    """Ensure no raw TOTP/base32 secrets remain in the users.yml file.

    This looks for long uppercase base32-like strings which are typical for
    TOTP shared secrets (A-Z2-7, length >= 16). The specific offending line
    referenced in the finding was replaced with a REDACTED placeholder.
    """
    repo_root = pathlib.Path(__file__).resolve().parents[2]
    users_file = repo_root / "data" / "static" / "users.yml"
    content = users_file.read_text(encoding="utf-8")

    # Match sequences of A-Z and 2-7 of length 16 or more (common base32)
    base32_re = re.compile(r"\b[A-Z2-7]{16,}\b")
    matches = base32_re.findall(content)

    # Fail if any likely base32 secret remains
    assert matches == [], f"Found probable raw TOTP/base32 secrets in users.yml: {matches}"

