# frozen_string_literal: true

describe NullFortyTime do
  let(:null_forty_time) { NullFortyTime.new }

  describe 'minutes' do
    it 'returns 0' do
      expect(null_forty_time.minutes).to eq 0
    end
  end

  describe 'to_s' do
    it 'returns an empty string' do
      expect(null_forty_time.to_s).to eq ''
    end
  end

  describe 'adding with FortyTime' do
    it 'returns the other' do
      other = FortyTime.new(1)
      result = null_forty_time + other
      expect(result).to be other
      expect(result).to be_an_instance_of(FortyTime)
    end
  end

  describe 'adding with NullFortyTime' do
    it 'returns the other' do
      other = NullFortyTime.new
      result = null_forty_time + other
      expect(result).to be other
      expect(result).to be_an_instance_of(NullFortyTime)
    end
  end

  describe 'added to FortyTime' do
    it 'returns the FortyTime' do
      other = FortyTime.new(1)
      result = other + null_forty_time
      expect(result.minutes).to eq other.minutes
      expect(result).to be_an_instance_of(FortyTime)
    end
  end

  describe 'subtraction with FortyTime' do
    it 'returns the other' do
      other = FortyTime.new(1)
      result = null_forty_time - other
      expect(result).to be other
    end
  end

  describe 'subtraction with NullFortyTime' do
    it 'returns the other' do
      other = NullFortyTime
      result = null_forty_time - other
      expect(result).to be other
    end
  end

  describe 'subtracted from FortyTime' do
    it 'returns the FortyTime' do
      other = FortyTime.new(1)
      result = other - null_forty_time
      expect(result.minutes).to eq other.minutes
      expect(result).to be_an_instance_of(FortyTime)
    end
  end
end
