# kibble

![](https://raw.github.com/scottmotte/kibble/master/kibble.png)

RESTful API on top of Dogecoin.

```
curl -X GET http://yourpap.herokuapp.com/so/get_balance
```

If you would like some tip to this shibe: `DEfjuBpDUa9fh98mzzyfHFNjuzGSKFgoWt`

## Usage

The endpoints follow closely with the cli command list [here](https://en.bitcoin.it/wiki/Original_Bitcoin_client/API_calls_list). They are structured like so.

`
/:version/:command?args=optional,arguments,seperated,by,comma
`

The current version is the `so` version.

For example: `/so/get_transaction?args=transaction_id`

Here's a non-exhaustive list of the available endpoints.

```
/so/add_multi_sig_address
/so/add_node
/so/backup_wallet
/so/create_multi_sig
/so/create_raw_transaction
/so/decode_raw_transaction
/so/dump_priv_key
/so/encrypt_wallet
/so/get_account
/so/get_account_address
/so/get_added_node_info
/so/get_addresses_by_account
/so/get_balance
/so/get_block
/so/get_block_count
/so/get_block_hash
/so/get_block_template
/so/get_connection_count
/so/get_difficulty
/so/get_generate
/so/get_hashes_per_second
/so/get_hashes_per_sec
/so/get_info
/so/get_mining_info
/so/get_new_address
/so/get_peer_info
/so/get_raw_memo_pool
/so/get_raw_transaction
/so/get_received_by_account
/so/get_received_by_address
/so/get_transaction
/so/get_tx_out
/so/get_txt_out_set_info
/so/get_work
/so/help
/so/import_priv_key
/so/keypool_refill
/so/key_pool_refill
/so/list_accounts
/so/list_address_groupings
/so/list_lock_unspent
/so/list_received_by_account
/so/list_received_by_address
/so/list_since_block
/so/list_transactions
/so/list_unspent
/so/lock_unspent
/so/move
/so/send_from
/so/send_many
/so/send_raw_transaction
/so/send_to_address
/so/set_account
/so/set_generate
/so/set_tx_fee
/so/sign_message
/so/sign_raw_transaction
/so/stop
/so/submit_block
/so/validate_address
/so/verify_message
/so/wallet_lock
/so/wallet_passphrase
/so/wallet_passphrase_change
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
