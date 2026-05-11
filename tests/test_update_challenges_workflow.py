import re


def test_workflow_run_uses_env_for_github_ref():
    path = '.github/workflows/update-challenges-ebook.yml'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The run: block should not directly interpolate github context (no '${{ github.ref_name }}')
    assert '${{ github.ref_name }}' not in content

    # There should be an env variable REF_NAME set from github.ref_name
    assert re.search(r"^\s*env:\s*$", content, flags=re.M)
    assert 'REF_NAME: ${{ github.ref_name }}' in content

    # The wget line should use the environment variable (quoted) and not the raw github context
    assert 'wget "https://raw.githubusercontent.com/juice-shop/juice-shop/$REF_NAME/data/static/challenges.yml"' in content

