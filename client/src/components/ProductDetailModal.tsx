import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export interface ProductDetail {
  name: string;
  description: string;
  casNumber?: string;
  applications: string[];
  specifications?: Record<string, string>;
}

export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  image: string; // URL to the product image
  details: ProductDetail[];
  tags: string[];
}

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductCategory;
}

export default function ProductDetailModal({ isOpen, onClose, product }: ProductDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <div className="relative w-full h-40 bg-gradient-to-r from-primary/80 to-primary mb-4 rounded-t-lg overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover opacity-50"
          />
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 rounded-full p-1 bg-white/20 hover:bg-white/40 transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-bold text-white">{product.title}</h2>
          </div>
        </div>
        
        <div className="px-6">
          <p className="text-gray-600 mb-4">
            {product.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.map(tag => (
            <Badge key={tag} variant="outline" className="bg-primary/10 text-primary">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="space-y-6 mt-4">
          {product.details.map((detail, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{detail.name}</h3>
              <p className="text-gray-600 mb-3">{detail.description}</p>
              
              {detail.casNumber && (
                <div className="mb-3">
                  <span className="font-medium text-gray-700">CAS Number: </span>
                  <span className="text-gray-600">{detail.casNumber}</span>
                </div>
              )}
              
              {detail.applications && detail.applications.length > 0 && (
                <div className="mb-3">
                  <h4 className="font-medium text-gray-700 mb-1">Applications:</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    {detail.applications.map((app, i) => (
                      <li key={i}>{app}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {detail.specifications && Object.keys(detail.specifications).length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Specifications:</h4>
                  <div className="bg-gray-50 rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <tbody className="divide-y divide-gray-200">
                        {Object.entries(detail.specifications).map(([key, value]) => (
                          <tr key={key}>
                            <td className="px-4 py-2 text-sm font-medium text-gray-700">{key}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}