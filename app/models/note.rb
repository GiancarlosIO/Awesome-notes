class Note < ApplicationRecord
  belongs_to :user
  has_many :notes_tag
  has_many :tags, through: :notes_tag

  def get_tags
    @tags = [];
    self.tags.each{|tag| @tags << tag.name}
    return @tags
  end
end
