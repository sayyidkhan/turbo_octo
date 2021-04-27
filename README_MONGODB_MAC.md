## MongoDB

### Installation for mac
Tap the MongoDB Homebrew Tap to download the official Homebrew formula for MongoDB and the Database Tools, by running the following command in your macOS Terminal:
```
brew tap mongodb/brew
```
To install MongoDB, run the following command in your macOS Terminal application:
```
brew install mongodb-community@4.4
```

### Run for mac 
To run MongoDB (i.e. the mongod process) as a macOS service, issue the following:
```
brew services start mongodb-community@4.4
```
To stop a mongod running as a macOS service, use the following command as needed:
```
brew services stop mongodb-community@4.4
```

more info: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

### Do i Already have MongoDB Installed for mac

If you’re not sure if you already have it installed you can run the command:
```
which mongo
```

You can also check if it’s been installed through Homebrew by using this command to see what’s been installed via Homebrew:
```
brew list
```
the outcome will be presented as such.
```
$ brew list
bash-completion         mongodb                 postgresql              the_silver_searcher     zsh
gdbm                    ncurses                 python                  tig                     zsh-completions
heroku                  node                    python@2                tree
heroku-node             openssl                 readline                xz
icu4c                   pcre                    sqlite                  yarn
```

### MongoDB is Running, now what?

So you have MongoDB running but maybe you’re not really sure if it’s working and you’re a long way away from setting up any
type of integration with your project. An easy way to verify that MongoDB is working is to use the MongoDB Shell.
The MongoDB Shell only works while the MongoDB Daemon is running, so you must have started it with the mongod command.
Once the daemon is running though, you can run the following command to get into the shell:

```
mongo
```

If you enter the shell you’ll get a shell prompt that looks something like this:

```
anonymous:demoDatabase >
```

Then you can run this command to just see a list of the databases in MongoDB:

```
> show dbs
admin             0.000GB
config            0.000GB
local             0.000GB
test              0.000GB
```

At this point when you’re in the MongoDB shell you can create databases, collections, and documents. Feel free to explore!