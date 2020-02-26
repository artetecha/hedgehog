#!/usr/bin/env bash

apt-get update
apt-get install -y postgresql-client
apt-get install -y sudo
adduser www-data sudo
adduser node sudo
echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers