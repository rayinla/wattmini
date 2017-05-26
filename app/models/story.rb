class Story < ApplicationRecord
	validates :url, uniqueness: true
end
