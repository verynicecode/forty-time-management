require "forty_time/version"

class FortyTime
  class ParseError < StandardError; end

  def self.parse(input)
    return new(input) if input.is_a? Integer

    can_parse_string = input.is_a?(String) && input.match?(/:/)
    raise ParseError unless can_parse_string

    hours, extra = input.split(":").map(&:to_i)
    minutes = hours * 60 + extra
    new(minutes)
  end

  def initialize(minutes)
    @minutes = minutes
  end
end
