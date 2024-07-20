# RandomUser API Keys Usage
### In order to use the RandomUser more extensively, I have implemented a basic roundrobin mechanism that will allow us to use dynamically multiple API keys
# After looking at the RandomAPI as the randomuser has redirected me to (for further documentation I found out that in randomuser there is no use for API keys)


# Prerequisite:
### make sure you have your .env file filled with required environment variables (keys examples can be viewed in sample.env)
### an make sure you have port 5432 available on your host
### via the command: 'docker-compose -f ./.docker/docker-compose.yaml up -d'


# how to run:
# npm install
# npm start


# How to stop 
### run the command 'docker-compose -f ./.docker/docker-compose.yaml down'