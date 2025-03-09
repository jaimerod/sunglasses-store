cd /var/www
git config --global --add safe.directory /var/www
chmod -R a+w /var/www/web/sites/default/files/
composer install

cd /var/www/web/themes/custom/envivent
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"
# Download and install Node.js:
nvm install
nvm use
npm install --no-audit
./node_modules/gulp/bin/gulp.js develop