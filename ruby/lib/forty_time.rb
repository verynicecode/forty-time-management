# frozen_string_literal: true

class FortyTime
  VERSION = '0.0.3'

  class ParseError < StandardError; end

  def self.parse(input)
    return new(input) if input.is_a? Integer

    can_parse_string = input.is_a?(String) && input.match?(/:/)
    raise ParseError unless can_parse_string

    hours, extra = input.split(':').map(&:to_i)
    minutes = hours * 60 + extra

    minutes *= -1 if input[0] == '-'

    new(minutes)
  end

  attr_accessor :minutes

  def initialize(minutes)
    @minutes = minutes
  end

  def +(other)
    result = @minutes + other.minutes
    FortyTime.new(result)
  end

  def -(other)
    result = @minutes - other.minutes
    FortyTime.new(result)
  end

  def to_s
    hours = @minutes / 60
    extra = @minutes - hours * 60
    extra = "0#{extra}" if extra < 10
    [hours, extra].join(':')
  end
end
