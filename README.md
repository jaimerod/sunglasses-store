# Envivent Drupal 11 Starter Framework

## Quickstart

Requires: composer, nodejs, nvm, docker with *WSL2 enabled*

1. npm run start:app


## Easy to get started using docker

  - Comes pre-installed with Modules and Base Theme
  - Use docker-compose up to get started locally
  - Database is setup using docker/database/init.sql
  - Developers should dump the database to init.sql using "npm run database:save"

## Drush pre-installed

```
# Clear cache
./vendor/bin/drush cr

# Get admin login url
./vendor/bin/drush uli

# Run database updates
./vendor/bin/drush updb

# Dump the database
./vendor/bin/drush sql:dump
```

## Uses composer to install and update the core and modules

```
# Install the pathauto module
composer require drupal/pathauto

# Check for updates to modules and core
composer outdated 'drupal/*'

# Update core
composer update drupal/core-recommended --with-dependencies

# Update module
composer update drupal/pathauto

# Update everything
composer update
```

## Devops

To setup a new site, fork this repo, copy the github variables and enter the following:

* STAG_BASEURL
* STAG_BASEURL
* STAG_DBNAME
* STAG_DBHOST
* STAG_DBUSER
* STAG_DBPASS

