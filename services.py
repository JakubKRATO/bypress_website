from flask import Blueprint, redirect, render_template, url_for


service = Blueprint("service", __name__)


@service.route("/<string:page>")
def service_page(page):
    if page in {"credit-control", "bookkeeping"}:
        return redirect(url_for("service.service_page", page="financial-operations-support"))

    return render_template(f"{page}.html")
