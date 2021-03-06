class Api::V1::NotesController < Api::V1::MasterApiController
  before_action :authenticate_api_user!
  before_action :set_note, only: [:show, :update, :destroy]

  def index
    @notes = current_api_user.notes.reverse
    @tags = @notes.map{|note| note.get_tags}.select{|t| t.length > 0}
    @tagsNotes = [];
    @tags.each{|t| t.each{|s| @tagsNotes << s } }
    @tagsNotes.uniq!
  end

  def show
  end

  def create
    @note = current_api_user.notes.new(note_params)
    if @note.save
      render template: 'api/v1/notes/show'
    else
      render json: { status: 'error', errors: @note.errors }, status: 422
    end
  end

  def update
    if @note.update(note_params)
      render template: 'api/v1/notes/show', status: 200
    else
      render json: { status: 'error', errors: @note.errors }, status: 422
    end
  end

  def destroy
    @note.tags.delete_all
    @tags = current_api_user.notes.map{|note| note.get_tags}.select{|t| t.length > 0}
    @tagsNotes = [];
    @tags.each{|t| t.each{|s| @tagsNotes << s } }
    @tagsNotes.uniq!
    if @note.destroy
      render template: 'api/v1/tags/index', status: 200
    else
      render json: { status: 'error', errors: @note.errors }, status: 422
    end
  end

  private
  def set_note
    if Note.where(id: params[:id], user_id: current_api_user.id).first.nil?
      render json: { status: "error", errors: ['Note not found'] }, status: 404
    else
      @note = Note.find(params[:id])
    end
  end

  def note_params
    params.require(:note).permit(:text)
  end

end