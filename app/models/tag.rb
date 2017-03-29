class Tag < ApplicationRecord
  belongs_to :note
  validates :name, presence: true
end
