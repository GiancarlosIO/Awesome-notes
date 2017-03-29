class Note < ApplicationRecord
  belongs_to :user
  has_many :tags
  validates :text, presence: true
end
