# frozen_string_literal: true

describe FortyTime do
  describe '#to_s' do
    context 'with an input that has no minutes' do
      it 'returns a properly formatted string' do
        forty_time = FortyTime.new(480)
        expect(forty_time.to_s).to eq '8:00'
      end
    end

    context 'with an input that has less than 10 minutes' do
      it 'returns a properly formatted string' do
        forty_time = FortyTime.new(481)
        expect(forty_time.to_s).to eq '8:01'
      end
    end

    context 'with an input that has more than 10 minutes' do
      it 'returns a properly formatted string' do
        forty_time = FortyTime.new(491)
        expect(forty_time.to_s).to eq '8:11'
      end
    end
  end
end
