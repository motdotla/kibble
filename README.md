# kibble

RESTful API on top of Dogecoin.

![](https://raw.github.com/scottmotte/kibble/master/kibble.png)

If you would like some tip to this shibe: `DEfjuBpDUa9fh98mzzyfHFNjuzGSKFgoWt`

```
curl -X GET http://localhost:3000/so/get_balance
```

## Usage

TODO: List of all available API commands will go here.

```
/so/get_balance
/so/get_transaction?args=<transaction_id>
```

## Installation

### Prerequisites

You need to have a `dogecoind` server that the API can talk to. I've created an easy way to do this [here](https://github.com/scottmotte/ansible-dogecoind) - called [ansible-dogecoind](https://github.com/scottmotte/ansible-dogecoind).

### Heroku

```
git clone https://github.com/scottmotte/kibble.git
cd kibble
heroku create
heroku config:set DOGE_HOST=101.101.101.101
heroku config:set DOGE_PORT=22555
heroku config:set DOGE_USER=dogeuser
heroku config:set DOGE_PASS=dogepassword
git push heroku master
```

That's it. You will now have running RESTful API access to your Dogecoin installation.

### Development

```
git clone https://github.com/scottmotte/kibble.git
cd kibble
npm install
cp .env.example .env
```

Edit the contents of `.env` to match your local Dogecoin install.

```
node app.js
```
