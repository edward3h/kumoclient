# Deployment
This is how I have it deployed at home.

My home server is running Ubuntu 18.04 with Apache deployed at port 80. The document root is `/var/www/html`

## Client
The app is deployed under path `/heat` - see the `"homepage"` entry in `package.json`. To achieve this I just symlinked the build directory.

```bash
yarn build
sudo ln -s /home/edward/src/kumoclient/build /var/www/html/heat
```

## API
The API server is running as its own Systemd service. See https://github.com/edward3h/kumojs/tree/systemd/deployment/systemd

To map it into an Apache path I used a `ProxyPass` directive like this:

```apache
<Location "/heat/v0/">
ProxyPass "http://localhost:18084/v0/"
ProxyPassReverse "http://localhost:18084/v0/"
</Location>
```
