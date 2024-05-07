desc "Build binaries"
task :build do |task|
  FileUtils.mkdir_p('bin') or exit 1

  system('corepack enable --install-directory ./bin') or exit 1
  system('bin/yarn install') or exit 1
  system('NODE_OPTIONS="--max-old-space-size=4096" bin/yarn build') or exit 1
  system('rm -rf node_modules') or exit 1
  system('bin/yarn install --production') or exit 1
end
