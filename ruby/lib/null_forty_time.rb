# frozen_string_literal: true

class NullFortyTime < FortyTime
  def initialize
    super(0)
  end

  def value; end

  def +(other)
    other
  end

  def -(other)
    other
  end

  def to_s
    ''
  end
end
