#environment
env=$1

#cucumber tag
tag=$2

#run cucumber tests & on failure run postcucumber
yarn --cwd e2e run cucumber:$env --profile $tag || yarn --cwd e2e run postcucumber