class Note < ApplicationRecord
  belongs_to :user
  has_many :tags

  def get_tags
    @tags = [];
    self.tags.each{|tag| @tags << tag.name}
    return @tags
  end
end
