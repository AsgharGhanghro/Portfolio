# Increase buffer size to 500MB
git config --global http.postBuffer 524288000

# Increase timeout to 10 minutes
git config --global http.timeout 600

# Now try pushing again
git push -u origin main


# Check your current remote URL
git remote -v

# If it shows HTTPS, switch to SSH
git remote set-url origin git@github.com:https://github.com/AsgharGhanghro/Asghar_Portfolio.git

# Now push
git push -u origin main


# Check what's being pushed
git status

# If you have large files (node_modules, build folders), add to .gitignore
echo "node_modules/" >> .gitignore
echo "build/" >> .gitignore
echo "dist/" >> .gitignore
echo ".next/" >> .gitignore
echo "*.log" >> .gitignore

# Remove them from git (but keep locally)
git rm -r --cached node_modules
git rm -r --cached build
git rm -r --cached dist

# Commit
git add .gitignore
git commit -m "Remove large folders from git"

# Now push
git push -u origin main

# Install Git LFS (if not installed)
git lfs install

# Track large files (images, videos, etc.)
git lfs track "*.png"
git lfs track "*.jpg"
git lfs track "*.mp4"
git lfs track "*.pdf"

# Add .gitattributes
git add .gitattributes

# Commit and push
git commit -m "Add Git LFS"
git push -u origin main


# See what files are being tracked
git ls-files | grep -E "node_modules|build|dist|.next"

# If you see these folders, remove them
git rm -r --cached node_modules
git rm -r --cached build
git rm -r --cached dist
git rm -r --cached .next

# Add to .gitignore
echo "node_modules/" >> .gitignore
echo "build/" >> .gitignore
echo "dist/" >> .gitignore
echo ".next/" >> .gitignore

# Commit
git add .gitignore
git commit -m "Remove build artifacts from git"

# Push
git push -u origin main

git config --global http.postBuffer 524288000 && git config --global http.timeout 600 && git push -u origin main