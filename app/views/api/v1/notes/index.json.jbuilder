json.notes @notes do |note|
  json.id note.id
  json.text note.text
  json.created_at note.created_at
  json.updated_at note.updated_at
  json.tags note.tags do |tag|
    json.id tag.id
    json.name tag.name
    json.created_at tag.created_at
    json.updated_at tag.updated_at
  end
end
json.tags @tagsNotes