class Tag < ApplicationRecord
  belongs_to :note
  validates :name, presence: true, uniqueness: true

  def self.create_with_array(tags = [], note_id)
    note = Note.find(note_id)
    if tags.length > 0
      tags.each do |t|
        tag = self.find_or_create_by(name: t)
        note.tags << tag
      end
    elsif tags.length === 0
      note.tags.delete_all
    end
  end

  def self.update_tags(tag, note_id)
    note_tags = Note.find(note_id).tags.map{|t| t.name}
    note = Note.find(note_id)
    if note_tags.include?(tag)
      note.tags.delete(self.find_by(name: tag))
    else
      tag = self.find_or_create_by(name: tag)
      note.tags << tag
    end
  end
end
