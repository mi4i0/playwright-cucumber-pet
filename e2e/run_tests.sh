#environment
env=$1

#cucumber tag
tag=$2

#run cucumber tests & on failure run postcucumber
if ! yarn --cwd e2e run cucumber:$env --profile $tag; then
  yarn --cwd e2e run postcucumber;
  exit 1;
fi