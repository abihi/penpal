from flask import jsonify, make_response

from app.crud import penpal
from app.blueprints.penpal import bp
from app.schemas.penpal import penpal_schema, penpals_schema


@bp.route("/", methods=["GET"])
def get_penpals():
    penpals = penpal.read_penpals()
    return jsonify(penpals_schema.dump(penpals))


@bp.route("/<int:_id>", methods=["GET"])
def get_penpal(_id):
    try:
        _penpal = penpal.read_penpal(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return penpal_schema.dump(_penpal)


@bp.route("", methods=["POST"])
def post_penpal():
    try:
        _penpal = penpal.create_penpal()
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return penpal_schema.dump(_penpal), 201


@bp.route("/<int:_id>", methods=["PUT"])
def put_penpal(_id):
    try:
        _penpal = penpal.update_penpal(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return penpal_schema.dump(_penpal)


@bp.route("/<int:_id>", methods=["DELETE"])
def delete_penpal(_id):
    try:
        penpal.delete_penpal(_id)
    except AssertionError as exception_message:
        return make_response(jsonify(msg="Error: {}. ".format(exception_message)), 400)
    return "", 204
