from flask import Blueprint, render_template


service = Blueprint("service", __name__)


@service.route("/<string:page>")
def service_page(page):
    return render_template(f"{page}.html")
