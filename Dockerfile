FROM wordpress:latest

# Install necessary utilities
RUN apt-get update && \
    apt-get install -y unzip curl

# Install WP-CLI
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    chmod +x wp-cli.phar && \
    mv wp-cli.phar /usr/local/bin/wp

# Install WP Mail SMTP plugin
RUN curl -L https://downloads.wordpress.org/plugin/wp-mail-smtp.zip -o wp-mail-smtp.zip \
    && unzip wp-mail-smtp.zip -d /usr/src/wordpress/wp-content/plugins \
    && rm wp-mail-smtp.zip
