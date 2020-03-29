# frozen_string_literal: true

describe FortyTime do
  describe 'add' do
    it 'returns the correct result' do
      lhs = FortyTime.new(420)
      rhs = FortyTime.new(60)

      result = lhs + rhs
      expect(result.minutes).to eq 480
    end
  end

  describe 'subtract' do
    it 'returns the correct result' do
      lhs = FortyTime.new(1020)
      rhs = FortyTime.new(540)

      result = lhs - rhs
      expect(result.minutes).to eq 480
    end
  end

  describe 'a bunch of operations' do
    it 'returns the correct result' do
      in_time = FortyTime.new(540)        #  9:00
      out_time = FortyTime.new(1020)      # 17:00
      pto_minutes = FortyTime.new(60)     #  1:00
      adjust_minutes = FortyTime.new(-60) # -1:00

      result = (out_time - in_time) + pto_minutes + adjust_minutes
      expect(result.minutes).to eq 480
    end
  end

  describe 'with negative string amounts' do
    it 'returns the correct result' do
      lhs = FortyTime.parse('8:00')
      rhs = FortyTime.parse('-0:30')

      result = lhs + rhs
      expect(result.minutes).to eq 450
    end
  end
end
