class Api::V1::TagsController < Api::V1::MasterApiController
  before_action :authenticate_api_user!
  before_action :set_note, only: [:create, :update]
  before_action :set_tag, only: [:update, :destroy]

  def index
    @tags = current_api_user.notes.reverse.map{|note| note.get_tags}.select{|t| t.length > 0}
    @tagsNotes = [];
    @tags.each{|t| t.each{|s| @tagsNotes << s } }
    @tagsNotes.uniq!
  end

  def create
    if Tag.update_tags(tag_params[:tag_name], @note.id)
      render template: 'api/v1/notes/show', status: 200
    else
      render json: { status: 'error', errors: 'error to update tag' }
    end
  end

  def update
    if Tag.update_tags(tag_params[:tag_name], @note.id)
      render template: 'api/v1/tags/show', status: 200
    else
      render json: { status: 'error', errors: 'error to update tag' }
    end
  end

  def destroy
    if @tag.destroy
      render json: { status: 'success' }, status: 200
    else
      render json: { status: 'error', errors: @tag.errors }
    end
  end

  private
  def set_note
    if Note.where(id: tag_params[:note_id], user_id: current_api_user.id).first.nil?
      render json: { status: 'error', errors: ['Note not found'] }, status: 404
    else
      @note = current_api_user.notes.find(tag_params[:note_id])
    end
  end

  def set_tag
    if Tag.where(id: params[:id], note_id: tag_params[:note_id]).first.nil?
      render json: { status: 'error', errors: ['tag not found'] }, status: 404
    else
      @tag = Tag.find(params[:id])
    end
  end

  def tag_params
    params.require(:tag).permit(:note_id, :tag_name)
  end
end