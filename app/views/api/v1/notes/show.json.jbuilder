json.note do
  json.id @note.id
  json.text @note.text
  json.created_at @note.created_at
  json.updated_at @note.updated_at
  json.tags @note.get_tags
end
json.tags @tagsNotes