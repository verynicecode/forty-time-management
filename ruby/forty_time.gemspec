# frozen_string_literal: true

require_relative 'lib/forty_time'

Gem::Specification.new do |spec|
  spec.name          = 'forty_time'
  spec.version       = FortyTime::VERSION
  spec.authors       = ['Jon Allured']
  spec.email         = ['jon.allured@gmail.com']

  spec.summary       = 'Easily work with time'
  spec.description   = 'This gem helps one go between intergers and strings to represent time amounts.'
  spec.homepage      = 'https://www.fortyeven.com/'
  spec.license       = 'MIT'
  spec.required_ruby_version = Gem::Requirement.new('>= 2.6.5')

  spec.metadata['changelog_uri'] = 'https://github.com/verynicecode/forty-time-management/blob/master/ruby/CHANGELOG.md'
  spec.metadata['homepage_uri'] = spec.homepage
  spec.metadata['rubygems_mfa_required'] = 'true'
  spec.metadata['source_code_uri'] = 'https://github.com/verynicecode/forty-time-management'

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files = Dir.chdir(File.expand_path(__dir__)) do
    `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  end
  spec.bindir        = 'exe'
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ['lib']
end
