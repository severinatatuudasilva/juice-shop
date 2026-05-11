import json
import pathlib


def test_elliptic_not_vulnerable_version():
    pkg_lock = pathlib.Path("frontend/package-lock.json").read_text(encoding="utf-8")
    # Ensure the known vulnerable version is not present
    assert '"elliptic": {"version": "6.6.1"' not in pkg_lock


def test_elliptic_upgraded_version_present():
    data = json.loads(pathlib.Path("frontend/package-lock.json").read_text(encoding="utf-8"))
    elliptic = data.get("dependencies", {}).get("elliptic")
    assert elliptic is not None, "elliptic entry must exist in package-lock"
    # The fix upgrades elliptic to a non-vulnerable version (>= 6.6.2)
    assert elliptic.get("version") >= "6.6.2"

