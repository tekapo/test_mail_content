FROM wordpress:latest

# Install WP Mail SMTP plugin
RUN curl -L https://downloads.wordpress.org/plugin/wp-mail-smtp.zip -o wp-mail-smtp.zip \
    && unzip wp-mail-smtp.zip -d /usr/src/wordpress/wp-content/plugins \
    && rm wp-mail-smtp.zip
