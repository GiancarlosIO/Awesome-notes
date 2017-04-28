class CreateNotesTags < ActiveRecord::Migration[5.1]
  def change
    create_table :notes_tags do |t|
      t.integer :note_id
      t.integer :tag_id

      t.timestamps
    end

    add_index :notes_tags, [:note_id, :tag_id]
  end
end
