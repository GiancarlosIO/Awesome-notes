json.tag do
  json.id @tag.id
  json.name @tag.name
  json.note_id @tag.note_id
  json.created_at @tag.created_at
  json.updated_at @tag.updated_at
end