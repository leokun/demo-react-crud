FROM node:13-slim AS tmp
COPY . /app
RUN cd /app && npm install && npm run build


FROM httpd:alpine

COPY --from=tmp /app/build /usr/local/apache2/htdocs/

RUN echo "Options -MultiViews\nRewriteEngine On\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteRule ^ index.html [QSA,L]" >> /usr/local/apache2/htdocs/.htaccess
