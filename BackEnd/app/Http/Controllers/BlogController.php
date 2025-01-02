<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{

    public function index()
    {
        $blogs = Blog::paginate(4);
        return response()->json([
            'status' => true,
            'blogs'  => $blogs,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'title'       => 'required',
                'description' => 'required',
                'image'       => 'required',
                'author'      => 'required',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error'  => $validator->errors(),
            ]);
        }

        if ($request->hasFile('image')) {
            $image    = $request->image;
            $new_name = rand() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $new_name);

            Blog::create([
                'title'       => $request->title,
                'description' => $request->description,
                'image'       => $new_name,
                'author'      => $request->author,
            ]);

            return response()->json([
                'status'  => true,
                'message' => 'Successfully Created',
            ]);
        }
    }

    public function edit($id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json([
                'status'  => false,
                'message' => 'Blog not found',
            ]);
        }

        return response()->json([
            'status' => true,
            'blog'   => $blog,
        ]);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json([
                'status'  => false,
                'message' => 'Blog not found',
            ]);
        }

        $validator = Validator::make($request->all(),
            [
                'title'       => 'required',
                'description' => 'required',
                'author'      => 'required',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error'  => $validator->errors(),
            ]);
        }

        if ($request->hasFile('image')) {

            if (File::exists(public_path('images/' . $blog->image))) {
                File::delete(public_path('images/' . $blog->image));
            }

            $image    = $request->image;
            $new_name = rand() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $new_name);
        } else {
            $new_name = $blog->image;
        }

        $blog->update([
            'title'       => $request->title,
            'description' => $request->description,
            'image'       => $new_name,
            'author'      => $request->author,
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'Successfully Updated',
        ]);
    }

    public function destroy($id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json([
                'status'  => false,
                'message' => 'Blog not found',
            ]);
        }

        if (File::exists(public_path('images/' . $blog->image))) {
            File::delete(public_path('images/' . $blog->image));
        }

        $blog->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Successfully Deleted',
        ]);
    }
}
