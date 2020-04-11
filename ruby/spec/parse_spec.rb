# frozen_string_literal: true

describe FortyTime do
  describe '.parse' do
    context 'with a string' do
      context 'with a random format' do
        it 'raises a parse exception' do
          input = 'asdf'

          expect do
            FortyTime.parse input
          end.to raise_error FortyTime::ParseError
        end
      end

      context 'with proper formatting' do
        it 'parses that string and returns an instance' do
          input = '8:00'
          forty_time = FortyTime.parse input
          expect(forty_time).to be_an_instance_of(FortyTime)
        end
      end
    end

    context 'with an integer' do
      it 'parses that integer and returns an instance' do
        input = 480
        forty_time = FortyTime.parse input
        expect(forty_time).to be_an_instance_of(FortyTime)
      end
    end

    context 'with a float' do
      it 'raises a parse exception' do
        input = 480.5

        expect do
          FortyTime.parse input
        end.to raise_error FortyTime::ParseError
      end
    end

    context 'with nil' do
      it 'raises a parse exception' do
        input = nil

        expect do
          FortyTime.parse input
        end.to raise_error FortyTime::ParseError
      end
    end

    context 'with a random input like an array' do
      it 'raises a parse exception' do
        input = []

        expect do
          FortyTime.parse input
        end.to raise_error FortyTime::ParseError
      end
    end

    context 'with some negative minutes' do
      it 'parses that string and returns an instance with negative minutes' do
        input = '-0:30'
        forty_time = FortyTime.parse input
        expect(forty_time).to be_an_instance_of(FortyTime)
        expect(forty_time.minutes).to eq(-30)
      end
    end

    context 'with some negative hours' do
      it 'parses that string and returns an instance with negative minutes' do
        input = '-1:30'
        forty_time = FortyTime.parse input
        expect(forty_time).to be_an_instance_of(FortyTime)
        expect(forty_time.minutes).to eq(-90)
      end
    end
  end
end
