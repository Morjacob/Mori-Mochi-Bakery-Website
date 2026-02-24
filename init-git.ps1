<#
PowerShell helper to initialize git and push to a remote.
Usage:
  .\init-git.ps1 -remote "https://github.com/username/repo.git"
If you omit -remote the script will initialize and show next steps.
#>

param(
  [string]$remote = ""
)

if (-not (Test-Path .git)){
  git init
  git branch -M main
  git add .
  git commit -m "Initial commit: Mori Mochi demo site"
  Write-Host "Repository initialized."
} else {
  Write-Host ".git already exists in this folder."
}

if ($remote -ne ""){
  try{
    git remote add origin $remote
  } catch {
    Write-Host "Failed to add remote; it may already exist. Skipping."
  }
  Write-Host "Pushing to remote..."
  git push -u origin main
} else {
  Write-Host "No remote provided. To push, run:"
  Write-Host "  git remote add origin https://github.com/<username>/<repo>.git"
  Write-Host "  git push -u origin main"
}
