export default {
  '*': ['prettier --cache --write --ignore-unknown'],
  '*.ts': ['eslint --cache --fix'],
}
