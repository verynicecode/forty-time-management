# frozen_string_literal: true

class FortyTime
  VERSION = '0.0.5'

  class ParseError < StandardError; end

  def self.parse(input)
    return new(input) if input.is_a? Integer

    can_parse_string = input.is_a?(String) && input.match?(/:/)
    raise ParseError unless can_parse_string

    hours, extra = input.split(':').map(&:to_i)
    extra *= -1 if input[0] == '-'

    minutes = hours * 60 + extra

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
    hours = (@minutes / 60.0).to_i
    extra = (@minutes - hours * 60.0).to_i

    if @minutes.negative?
      hours *= -1
      extra *= -1
      hours = "-#{hours}"
    end

    extra = "0#{extra}" if extra < 10
    [hours, extra].join(':')
  end
end
