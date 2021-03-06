<?php

namespace Botble\Credit\Http\Requests;

use Botble\Support\Http\Requests\Request;

class CreditRequest extends Request
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     * @author Sang Nguyen
     */
    public function rules()
    {
        return [
            'post_id' => 'required',
        ];
    }
}
