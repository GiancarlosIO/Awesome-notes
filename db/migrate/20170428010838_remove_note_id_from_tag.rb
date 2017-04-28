class RemoveNoteIdFromTag < ActiveRecord::Migration[5.1]
  def change
    remove_column :tags, :note_id, :integer
  end
end
