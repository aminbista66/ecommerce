from django.shortcuts import render
from django.views.generic import ListView
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils.timesince import timesince
from django.db.models import F

from product.models import Product, ProductImage

def index(request):
    return render(request, 'seller/index.html', {})

class Inventory(LoginRequiredMixin, ListView):
    template_name = 'seller/inventory.html'
    context_object_name = 'products'
    paginate_by = 20

    def get_queryset(self):
        return Product.objects.filter(seller=self.request.user)