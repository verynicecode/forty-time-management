class FortyTime
  VERSION = "0.0.1"

  class ParseError < StandardError; end

  def self.parse(input)
    return new(input) if input.is_a? Integer

    can_parse_string = input.is_a?(String) && input.match?(/:/)
    raise ParseError unless can_parse_string

    hours, extra = input.split(":").map(&:to_i)
    minutes = hours * 60 + extra
    new(minutes)
  end

  attr_accessor :minutes

  def initialize(minutes)
    @minutes = minutes
  end

  def +(rhs)
    result = @minutes + rhs.minutes
    FortyTime.new(result)
  end

  def -(rhs)
    result = @minutes - rhs.minutes
    FortyTime.new(result)
  end

  def to_s
    hours = @minutes / 60
    extra = @minutes - hours * 60
    extra = "0#{extra}" if extra < 10
    [hours, extra].join(":")
  end
end
